import { chainWithHistory } from ".";

export const interactService = async (userInput = "", language = "es") => {
  const interactionResult = await chainWithHistory.invoke(
    {
      userInput,
      language,
    },
    {
      configurable: {
        sessionId: "foobarbaz",
      },
    },
  );

  console.log("\n=====START======\n");

  console.log("InteractionResult: ", interactionResult);

  console.log("\n=====END======\n");

  return interactionResult.nextQuestion;
};
