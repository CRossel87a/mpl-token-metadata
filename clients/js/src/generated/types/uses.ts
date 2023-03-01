/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Context, Serializer } from '@metaplex-foundation/umi';
import { UseMethod, UseMethodArgs, getUseMethodSerializer } from '.';

export type Uses = { useMethod: UseMethod; remaining: bigint; total: bigint };

export type UsesArgs = {
  useMethod: UseMethodArgs;
  remaining: number | bigint;
  total: number | bigint;
};

export function getUsesSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<UsesArgs, Uses> {
  const s = context.serializer;
  return s.struct<Uses>(
    [
      ['useMethod', getUseMethodSerializer(context)],
      ['remaining', s.u64()],
      ['total', s.u64()],
    ],
    { description: 'Uses' }
  ) as Serializer<UsesArgs, Uses>;
}
