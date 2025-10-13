import { pgTable, varchar, integer, timestamp, decimal, text } from 'drizzle-orm/pg-core';
import { entries } from './entries';

export const performanceMetrics = pgTable('performance_metrics', {
  id: varchar('id', { length: 191 }).primaryKey(),
  entryId: varchar('entry_id', { length: 191 })
    .notNull()
    .references(() => entries.id, { onDelete: 'cascade' }),
  metric: varchar('metric', { length: 100 }).notNull(),
  value: decimal('value', { precision: 10, scale: 2 }).notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  trend: varchar('trend', { length: 20 }), // 'increasing', 'decreasing', 'stable'
  benchmarkComparison: decimal('benchmark_comparison', { precision: 5, scale: 2 }),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});