
module.exports.helloWorld = async(event): Promise<void> => {
  const ONE = 1;
  try {
    console.info(`sns message:${event.Records[ONE].Sns.MessageId}`);
  } catch (err) {
    console.log("Error in function ", err);
  }
};
