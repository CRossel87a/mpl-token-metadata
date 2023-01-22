/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Account,
  Context,
  PublicKey,
  RpcAccount,
  Serializer,
  assertAccountExists,
  deserializeAccount,
} from '@lorisleiva/js-core';
import { TokenMetadataKey, getTokenMetadataKeySerializer } from '../types';

export type EditionMarker = Account<EditionMarkerAccountData>;

export type EditionMarkerAccountData = {
  key: TokenMetadataKey;
  ledger: Array<number>;
};

export async function fetchEditionMarker(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey
): Promise<EditionMarker> {
  const maybeAccount = await context.rpc.getAccount(publicKey);
  assertAccountExists(maybeAccount, 'EditionMarker');
  return deserializeEditionMarker(context, maybeAccount);
}

export async function safeFetchEditionMarker(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey
): Promise<EditionMarker | null> {
  const maybeAccount = await context.rpc.getAccount(publicKey);
  return maybeAccount.exists
    ? deserializeEditionMarker(context, maybeAccount)
    : null;
}

export function deserializeEditionMarker(
  context: Pick<Context, 'serializer'>,
  rawAccount: RpcAccount
): EditionMarker {
  return deserializeAccount(
    rawAccount,
    getEditionMarkerAccountDataSerializer(context)
  );
}

export function getEditionMarkerAccountDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<EditionMarkerAccountData> {
  const s = context.serializer;
  return s.struct<EditionMarkerAccountData>(
    [
      ['key', getTokenMetadataKeySerializer(context)],
      ['ledger', s.array(s.u8, 31)],
    ],
    'EditionMarker'
  );
}

export function getEditionMarkerSize(_context = {}): number {
  return 32;
}
