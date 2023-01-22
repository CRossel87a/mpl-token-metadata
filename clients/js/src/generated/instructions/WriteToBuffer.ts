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
} from '@lorisleiva/js-core';
import { WriteToBufferArgs, getWriteToBufferArgsSerializer } from '../types';

// Accounts.
export type WriteToBufferInstructionAccounts = {
  /** Payer and creator of the RuleSet */
  payer?: Signer;
  /** The PDA account where the RuleSet buffer is stored */
  bufferPda: PublicKey;
  /** System program */
  systemProgram?: PublicKey;
};

// Arguments.
export type WriteToBufferInstructionData = {
  discriminator: number;
  writeToBufferArgs: WriteToBufferArgs;
};

export type WriteToBufferInstructionArgs = {
  writeToBufferArgs: WriteToBufferArgs;
};

export function getWriteToBufferInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<WriteToBufferInstructionArgs, WriteToBufferInstructionData> {
  const s = context.serializer;
  return mapSerializer<
    WriteToBufferInstructionArgs,
    WriteToBufferInstructionData,
    WriteToBufferInstructionData
  >(
    s.struct<WriteToBufferInstructionData>(
      [
        ['discriminator', s.u8],
        ['writeToBufferArgs', getWriteToBufferArgsSerializer(context)],
      ],
      'WriteToBufferInstructionArgs'
    ),
    (value) => ({ discriminator: 2, ...value } as WriteToBufferInstructionData)
  ) as Serializer<WriteToBufferInstructionArgs, WriteToBufferInstructionData>;
}

// Instruction.
export function writeToBuffer(
  context: Pick<Context, 'serializer' | 'programs' | 'payer'>,
  input: WriteToBufferInstructionAccounts & WriteToBufferInstructionArgs
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId: PublicKey =
    context.programs.get('mplTokenAuthRules').publicKey;

  // Resolved accounts.
  const payerAccount = input.payer ?? context.payer;
  const bufferPdaAccount = input.bufferPda;
  const systemProgramAccount = input.systemProgram ?? {
    ...context.programs.get('splSystem').publicKey,
    isWritable: false,
  };

  // Payer.
  signers.push(payerAccount);
  keys.push({
    pubkey: payerAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(payerAccount, true),
  });

  // Buffer Pda.
  keys.push({
    pubkey: bufferPdaAccount,
    isSigner: false,
    isWritable: isWritable(bufferPdaAccount, true),
  });

  // System Program.
  keys.push({
    pubkey: systemProgramAccount,
    isSigner: false,
    isWritable: isWritable(systemProgramAccount, false),
  });

  // Data.
  const data =
    getWriteToBufferInstructionDataSerializer(context).serialize(input);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain,
  };
}
