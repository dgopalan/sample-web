import { Controller, Get, Status, Res } from "@tsed/common";
import { Docs, Summary, Description, Returns, Name } from "@tsed/swagger";
import * as Express from "express";

const RESPONSE: number = 200;

@Controller("/")
@Docs("api-v1")
@Name("Base v1")
export class HelloController {

  @Get("/hello")
  @Status(RESPONSE)
  @Summary("First controller")
  @Description("It is used to check if the API is sending data.")
  @Returns(RESPONSE, { description: "Ok" })
  public async hello(@Res() res: Express.Response): Promise<void> {
    res.send("Hello world");
  }

}
