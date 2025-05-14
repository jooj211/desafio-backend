/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import * as path from 'path';
import { AppModule } from '../app.module';
import { MetricsService } from '../modules/metrics/metrics.service';

interface RawMetric {
    datetime: { $date: string };
    inversor_id: number;
    potencia_ativa_watt: number | null;
    temperatura_celsius: number | null;
}

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const metricsService = app.get(MetricsService);

    const filePath = path.resolve(__dirname, '../../metrics.json');
    const raw: RawMetric[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    console.log(`Importing ${raw.length} records…`);
    const total = raw.length;

    for (let i = 0; i < total; i++) {
        const entry = raw[i];
        const itemNumber = i + 1;

        // Skip records with null power or temperature
        if (entry.potencia_ativa_watt == null || entry.temperatura_celsius == null) {
            const lineNumber = itemNumber * 8;
            console.warn(
                `Skipping record #${itemNumber} (approx line ${lineNumber}) due to missing power or temperature`,
            );
            continue;
        }

        await metricsService.create({
            timestamp: new Date(entry.datetime.$date),
            power: entry.potencia_ativa_watt,
            temperature: entry.temperatura_celsius,
            inverterId: entry.inversor_id,
        });

        const percent = Math.round(((i + 1) / total) * 100);
        process.stdout.write(`\rProgress: ${percent}% (${i + 1}/${total})`);
    }

    console.log('\nImport complete!');
    await app.close();
}

bootstrap().catch(err => {
    console.error(err);
    process.exit(1);
});