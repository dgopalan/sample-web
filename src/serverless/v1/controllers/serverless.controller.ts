/**
  * A class for managing ServerlessController.
  * @class
*/

export class ServerlessController {

  /**
   * Members of the class
  */

  /**
    * @constructor
    * @property {Instance} representing instances of the class ServerlessController.
  */
  constructor(
  ) {
  }
  public async helloWorld(event): Promise<void> {
    try {
      console.log("Function input: ", event);
    } catch (err) {
      throw err;
    }
  }

}
