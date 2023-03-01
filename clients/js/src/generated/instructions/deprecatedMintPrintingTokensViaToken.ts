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
import {
  MintPrintingTokensViaTokenArgs,
  MintPrintingTokensViaTokenArgsArgs,
  getMintPrintingTokensViaTokenArgsSerializer,
} from '../types';

// Accounts.
export type DeprecatedMintPrintingTokensViaTokenInstructionAccounts = {
  /** Destination account */
  destination: PublicKey;
  /** Token account containing one time authorization token */
  token: PublicKey;
  /** One time authorization mint */
  oneTimePrintingAuthorizationMint: PublicKey;
  /** Printing mint */
  printingMint: PublicKey;
  /** Burn authority */
  burnAuthority: Signer;
  /** Metadata key (pda of ['metadata', program id, mint id]) */
  metadata: PublicKey;
  /** Master Edition V1 key (pda of ['metadata', program id, mint id, 'edition']) */
  masterEdition: PublicKey;
  /** Token program */
  tokenProgram?: PublicKey;
  /** Rent */
  rent?: PublicKey;
};

// Arguments.
export type DeprecatedMintPrintingTokensViaTokenInstructionData = {
  discriminator: number;
  mintPrintingTokensViaTokenArgs: MintPrintingTokensViaTokenArgs;
};

export type DeprecatedMintPrintingTokensViaTokenInstructionDataArgs = {
  mintPrintingTokensViaTokenArgs: MintPrintingTokensViaTokenArgsArgs;
};

export function getDeprecatedMintPrintingTokensViaTokenInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  DeprecatedMintPrintingTokensViaTokenInstructionDataArgs,
  DeprecatedMintPrintingTokensViaTokenInstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    DeprecatedMintPrintingTokensViaTokenInstructionDataArgs,
    DeprecatedMintPrintingTokensViaTokenInstructionData,
    DeprecatedMintPrintingTokensViaTokenInstructionData
  >(
    s.struct<DeprecatedMintPrintingTokensViaTokenInstructionData>(
      [
        ['discriminator', s.u8()],
        [
          'mintPrintingTokensViaTokenArgs',
          getMintPrintingTokensViaTokenArgsSerializer(context),
        ],
      ],
      { description: 'DeprecatedMintPrintingTokensViaTokenInstructionData' }
    ),
    (value) =>
      ({
        ...value,
        discriminator: 8,
      } as DeprecatedMintPrintingTokensViaTokenInstructionData)
  ) as Serializer<
    DeprecatedMintPrintingTokensViaTokenInstructionDataArgs,
    DeprecatedMintPrintingTokensViaTokenInstructionData
  >;
}

// Instruction.
export function deprecatedMintPrintingTokensViaToken(
  context: Pick<Context, 'serializer' | 'programs'>,
  input: DeprecatedMintPrintingTokensViaTokenInstructionAccounts &
    DeprecatedMintPrintingTokensViaTokenInstructionDataArgs
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId: PublicKey =
    context.programs.get('mplTokenMetadata').publicKey;

  // Resolved accounts.
  const destinationAccount = input.destination;
  const tokenAccount = input.token;
  const oneTimePrintingAuthorizationMintAccount =
    input.oneTimePrintingAuthorizationMint;
  const printingMintAccount = input.printingMint;
  const burnAuthorityAccount = input.burnAuthority;
  const metadataAccount = input.metadata;
  const masterEditionAccount = input.masterEdition;
  const tokenProgramAccount = input.tokenProgram ?? {
    ...context.programs.get('splToken').publicKey,
    isWritable: false,
  };
  const rentAccount =
    input.rent ?? publicKey('SysvarRent111111111111111111111111111111111');

  // Destination.
  keys.push({
    pubkey: destinationAccount,
    isSigner: false,
    isWritable: isWritable(destinationAccount, true),
  });

  // Token.
  keys.push({
    pubkey: tokenAccount,
    isSigner: false,
    isWritable: isWritable(tokenAccount, true),
  });

  // One Time Printing Authorization Mint.
  keys.push({
    pubkey: oneTimePrintingAuthorizationMintAccount,
    isSigner: false,
    isWritable: isWritable(oneTimePrintingAuthorizationMintAccount, true),
  });

  // Printing Mint.
  keys.push({
    pubkey: printingMintAccount,
    isSigner: false,
    isWritable: isWritable(printingMintAccount, true),
  });

  // Burn Authority.
  signers.push(burnAuthorityAccount);
  keys.push({
    pubkey: burnAuthorityAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(burnAuthorityAccount, false),
  });

  // Metadata.
  keys.push({
    pubkey: metadataAccount,
    isSigner: false,
    isWritable: isWritable(metadataAccount, false),
  });

  // Master Edition.
  keys.push({
    pubkey: masterEditionAccount,
    isSigner: false,
    isWritable: isWritable(masterEditionAccount, false),
  });

  // Token Program.
  keys.push({
    pubkey: tokenProgramAccount,
    isSigner: false,
    isWritable: isWritable(tokenProgramAccount, false),
  });

  // Rent.
  keys.push({
    pubkey: rentAccount,
    isSigner: false,
    isWritable: isWritable(rentAccount, false),
  });

  // Data.
  const data =
    getDeprecatedMintPrintingTokensViaTokenInstructionDataSerializer(
      context
    ).serialize(input);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain,
  };
}
