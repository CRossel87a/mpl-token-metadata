/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  AccountMeta,
  Context,
  PublicKey,
  Serializer,
  Signer,
  WrappedInstruction,
  checkForIsWritableOverride as isWritable,
  mapSerializer,
  publicKey,
} from '@metaplex-foundation/umi';
import { findMetadataPda } from '../accounts';
import { BurnArgs, BurnArgsArgs, getBurnArgsSerializer } from '../types';

// Accounts.
export type BurnInstructionAccounts = {
  /** Metadata (pda of ['metadata', program id, mint id]) */
  metadata?: PublicKey;
  /** Asset owner */
  owner: Signer;
  /** Mint of token asset */
  mint: PublicKey;
  /** Token account to close */
  tokenAccount: PublicKey;
  /** MasterEdition of the asset */
  masterEditionAccount: PublicKey;
  /** SPL Token Program */
  splTokenProgram?: PublicKey;
  /** Metadata of the Collection */
  collectionMetadata?: PublicKey;
  /** Token Authorization Rules account */
  authorizationRules?: PublicKey;
  /** Token Authorization Rules Program */
  authorizationRulesProgram?: PublicKey;
};

// Arguments.
export type BurnInstructionData = { discriminator: number; burnArgs: BurnArgs };

export type BurnInstructionDataArgs = { burnArgs: BurnArgsArgs };

export function getBurnInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<BurnInstructionDataArgs, BurnInstructionData> {
  const s = context.serializer;
  return mapSerializer<
    BurnInstructionDataArgs,
    BurnInstructionData,
    BurnInstructionData
  >(
    s.struct<BurnInstructionData>(
      [
        ['discriminator', s.u8()],
        ['burnArgs', getBurnArgsSerializer(context)],
      ],
      { description: 'BurnInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 41 } as BurnInstructionData)
  ) as Serializer<BurnInstructionDataArgs, BurnInstructionData>;
}

// Instruction.
export function burn(
  context: Pick<Context, 'serializer' | 'programs' | 'eddsa'>,
  input: BurnInstructionAccounts & BurnInstructionDataArgs
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId: PublicKey =
    context.programs.get('mplTokenMetadata').publicKey;

  // Resolved accounts.
  const mintAccount = input.mint;
  const metadataAccount =
    input.metadata ??
    findMetadataPda(context, { mint: publicKey(mintAccount) });
  const ownerAccount = input.owner;
  const tokenAccountAccount = input.tokenAccount;
  const masterEditionAccountAccount = input.masterEditionAccount;
  const splTokenProgramAccount = input.splTokenProgram ?? {
    ...context.programs.get('splToken').publicKey,
    isWritable: false,
  };
  const collectionMetadataAccount = input.collectionMetadata ?? {
    ...programId,
    isWritable: false,
  };
  const authorizationRulesAccount = input.authorizationRules ?? {
    ...programId,
    isWritable: false,
  };
  const authorizationRulesProgramAccount = input.authorizationRulesProgram ?? {
    ...programId,
    isWritable: false,
  };

  // Metadata.
  keys.push({
    pubkey: metadataAccount,
    isSigner: false,
    isWritable: isWritable(metadataAccount, true),
  });

  // Owner.
  signers.push(ownerAccount);
  keys.push({
    pubkey: ownerAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(ownerAccount, true),
  });

  // Mint.
  keys.push({
    pubkey: mintAccount,
    isSigner: false,
    isWritable: isWritable(mintAccount, true),
  });

  // Token Account.
  keys.push({
    pubkey: tokenAccountAccount,
    isSigner: false,
    isWritable: isWritable(tokenAccountAccount, true),
  });

  // Master Edition Account.
  keys.push({
    pubkey: masterEditionAccountAccount,
    isSigner: false,
    isWritable: isWritable(masterEditionAccountAccount, true),
  });

  // Spl Token Program.
  keys.push({
    pubkey: splTokenProgramAccount,
    isSigner: false,
    isWritable: isWritable(splTokenProgramAccount, false),
  });

  // Collection Metadata.
  keys.push({
    pubkey: collectionMetadataAccount,
    isSigner: false,
    isWritable: isWritable(collectionMetadataAccount, true),
  });

  // Authorization Rules.
  keys.push({
    pubkey: authorizationRulesAccount,
    isSigner: false,
    isWritable: isWritable(authorizationRulesAccount, false),
  });

  // Authorization Rules Program.
  keys.push({
    pubkey: authorizationRulesProgramAccount,
    isSigner: false,
    isWritable: isWritable(authorizationRulesProgramAccount, false),
  });

  // Data.
  const data = getBurnInstructionDataSerializer(context).serialize(input);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain,
  };
}
