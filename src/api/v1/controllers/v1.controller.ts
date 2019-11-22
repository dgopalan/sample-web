import { Controller, Get, Status } from "@tsed/common";
import { Docs, Summary, Description, Returns, Name } from "@tsed/swagger";

const RESPONSE: number = 200;

@Controller("/")
@Docs("api-v1")
@Name("Base v1")
export class HealthController {

  @Get("/health")
  @Status(RESPONSE)
  @Summary("Health check endpoint")
  @Description("It is used to check if the API is up and running.")
  @Returns(RESPONSE, { description: "No Content" })
  public async health(): Promise<void> {
    return Promise.resolve();
  }

}
