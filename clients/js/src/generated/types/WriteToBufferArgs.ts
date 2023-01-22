/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  GetDataEnumKind,
  GetDataEnumKindContent,
  Serializer,
} from '@lorisleiva/js-core';

export type WriteToBufferArgs = {
  __kind: 'V1';
  serialized_rule_set: Uint8Array;
  overwrite: boolean;
};

export function getWriteToBufferArgsSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<WriteToBufferArgs> {
  const s = context.serializer;
  return s.dataEnum<WriteToBufferArgs>(
    [
      [
        'V1',
        s.struct<GetDataEnumKindContent<WriteToBufferArgs, 'V1'>>(
          [
            ['serialized_rule_set', s.bytes],
            ['overwrite', s.bool()],
          ],
          'V1'
        ),
      ],
    ],
    undefined,
    'WriteToBufferArgs'
  );
}

// Data Enum Helpers.
export function writeToBufferArgs(
  kind: 'V1',
  data: GetDataEnumKindContent<WriteToBufferArgs, 'V1'>
): GetDataEnumKind<WriteToBufferArgs, 'V1'>;
export function writeToBufferArgs<K extends WriteToBufferArgs['__kind']>(
  kind: K,
  data?: any
): WriteToBufferArgs & { __kind: K } {
  return Array.isArray(data)
    ? { __kind: kind, fields: data }
    : { __kind: kind, ...(data ?? {}) };
}
export function isWriteToBufferArgs<K extends WriteToBufferArgs['__kind']>(
  kind: K,
  value: WriteToBufferArgs
): value is WriteToBufferArgs & { __kind: K } {
  return value.__kind === kind;
}