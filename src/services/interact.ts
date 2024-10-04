import { chainWithHistory } from ".";

export const interactService = async (
  requestInput: RequestInput,
) => {
  const interactionResult = await chainWithHistory.invoke(
    {
      userInput: requestInput.input,
      language: requestInput.language,
    },
    {
      configurable: {
        sessionId: requestInput.sessionId,
      },
    },
  );

  console.log("\n=====START======\n");

  console.log("InteractionRequest: ", requestInput);

  console.log("InteractionResponse: ", interactionResult);

  console.log("\n=====END======\n");

  return interactionResult;
};
