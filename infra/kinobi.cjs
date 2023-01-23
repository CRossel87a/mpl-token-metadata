const path = require("path");
const {
  Kinobi,
  RenderJavaScriptVisitor,
  SetInstructionAccountDefaultValuesVisitor,
  SetLeafWrappersVisitor,
  DeleteNodesVisitor,
  UnwrapStructVisitor,
  UnwrapDefinedTypesVisitor,
  UpdateProgramsVisitor,
  UpdateAccountsVisitor,
  UpdateDefinedTypesVisitor,
  UpdateInstructionsVisitor,
} = require("@lorisleiva/kinobi");

// Paths.
const clientDir = path.join(__dirname, "..", "clients");
const idlDir = path.join(__dirname, "..", "idls");

// Instanciate Kinobi.
const kinobi = new Kinobi([
  path.join(idlDir, "mpl_token_auth_rules.json"),
  path.join(idlDir, "mpl_token_metadata.json"),
]);

// Update Programs.
kinobi.update(
  new UpdateProgramsVisitor({
    mplTokenAuthRules: { prefix: "Ta" },
    mplTokenMetadata: { prefix: "Tm" },
  })
);

// Update Accounts.
kinobi.update(
  new UpdateAccountsVisitor({
    "mplTokenAuthRules.FrequencyAccount": { name: "RuleSetFrequency" },
    "mplTokenMetadata.MasterEditionV2": { name: "MasterEdition" },
  })
);

// Update Instructions.
kinobi.update(
  new UpdateInstructionsVisitor({
    "mplTokenAuthRules.CreateOrUpdate": { name: "CreateOrUpdateRuleSet" },
    "mplTokenAuthRules.Validate": { name: "ValidateRuleSet" },
    "mplTokenAuthRules.WriteToBuffer": { name: "WriteRuleSetToBuffer" },
    "mplTokenMetadata.Create": {
      accounts: {
        mint: { isOptionalSigner: true },
      },
    },
  })
);

// Update Types.
kinobi.update(
  new UpdateDefinedTypesVisitor({
    "mplTokenMetadata.Key": { name: "TokenMetadataKey" },
    "mplTokenAuthRules.Key": { name: "TokenAuthRulesKey" },
    "mplTokenAuthRules.CreateOrUpdateArgs": {
      name: "CreateOrUpdateRuleSetArgs",
    },
    "mplTokenAuthRules.ValidateArgs": { name: "ValidateRuleSetArgs" },
    "mplTokenAuthRules.WriteToBufferArgs": { name: "WriteRuleSetToBufferArgs" },
  })
);

// Remove nodes.
kinobi.update(
  new DeleteNodesVisitor([
    // Duplicated from token auth rules.
    { type: "definedType", name: "Payload", program: "mplTokenMetadata" },
    { type: "definedType", name: "PayloadType", program: "mplTokenMetadata" },
    // Deprecated nodes.
    { type: "account", name: "ReservationListV1", program: "mplTokenMetadata" },
    { type: "account", name: "ReservationListV2", program: "mplTokenMetadata" },
    { type: "account", name: "MasterEditionV1", program: "mplTokenMetadata" },
  ])
);

// Wrap leaves.
kinobi.update(
  new SetLeafWrappersVisitor({
    // "splSystem.CreateAccount.lamports": { kind: "SolAmount" },
  })
);

// Set default values for instruction accounts.
kinobi.update(
  new SetInstructionAccountDefaultValuesVisitor([
    // { instruction: "TransferSol", account: "source", kind: "identity" },
  ])
);

// Unwrap data attribute of Metadata account.
kinobi.update(new UnwrapDefinedTypesVisitor(["Data"]));
kinobi.update(
  new UnwrapStructVisitor({
    "mplTokenMetadata.Metadata": ["data"],
    "mplTokenMetadata.CreateMetadataAccountInstructionArgs": ["data"],
  })
);

// Render JavaScript.
const jsDir = path.join(clientDir, "js", "src", "generated");
const prettier = require(path.join(clientDir, "js", ".prettierrc.json"));
kinobi.accept(new RenderJavaScriptVisitor(jsDir, { prettier }));
