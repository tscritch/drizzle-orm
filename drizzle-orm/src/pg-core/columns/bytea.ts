import type { ColumnBuilderBaseConfig, ColumnBuilderRuntimeConfig, MakeColumnConfig } from '~/column-builder.ts';
import type { ColumnBaseConfig } from '~/column.ts';
import { entityKind } from '~/entity.ts';
import type { AnyPgTable } from '../table.ts';
import { PgColumn, PgColumnBuilder } from './common.ts';

export type PgByteaBuilderInitial<TName extends string> = PgByteaBuilder<{
	name: TName;
	dataType: 'bytea';
	columnType: 'PgBytea';
	data: number;
	driverParam: number | string;
	enumValues: undefined;
}>;

export class PgByteaBuilder<T extends ColumnBuilderBaseConfig<'bytea', 'PgBytea'>>
	extends PgColumnBuilder<T>
{
	static override readonly [entityKind]: string = 'PgByteaBuilder';

	constructor(name: T['name']) {
		super(name, 'bytea', 'PgBytea');
	}

	/** @internal */
	override build<TTableName extends string>(
		table: AnyPgTable<{ name: TTableName }>,
	): PgBytea<MakeColumnConfig<T, TTableName>> {
		return new PgBytea<MakeColumnConfig<T, TTableName>>(table, this.config as ColumnBuilderRuntimeConfig<any, any>);
	}
}

export class PgBytea<T extends ColumnBaseConfig<'bytea', 'PgBytea'>> extends PgColumn<T> {
	static override readonly [entityKind]: string = 'PgBytea';

	getSQLType(): string {
		return 'bytea';
	}
}

export function bytea(): PgByteaBuilderInitial<''>;
export function bytea<TName extends string>(name: TName): PgByteaBuilderInitial<TName>;
export function bytea(name?: string) {
	return new PgByteaBuilder(name ?? '');
}
