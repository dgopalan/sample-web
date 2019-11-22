/* eslint-disable */
import { GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings } from "@tsed/common";
import "@tsed/swagger";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
import * as cors from "cors";
import * as path from "path";
import { HealthController } from "./api/v1/controllers/v1.controller";
import { HelloController } from "./api/v1/controllers/hello.controller";
import { config } from "./config/environment";

const rootDir = path.resolve(__dirname);
const port = config.project.port;
const env = config.project.environment;

@ServerSettings({
  rootDir,
  acceptMimes: ["application/json", "application/x-www-form-urlencoded"],
  env,
  port,
  httpPort: port || 8083,
  httpsPort: false, // CHANGE
  logger: {
    debug: true,
    logRequest: true,
    requestFields: ["reqId", "method", "url", "headers", "query", "params", "duration"]
  },
  mount: {
    "/api/v1": [
      HealthController,
      HelloController
      // `${rootDir}/api/v1/controllers/**/*.{ts,js}` // Automatic Import, /!\ doesn't works with webpack/jest, use  require.context() or manual import instead
    ]
  },
  swagger: [
    {
      path: "/api/v1/api-docs"
    }
  ],
  calendar: {
    token: true
  },
  statics: {
    "/statics": path.join(__dirname, "..", "statics")
  },
  componentsScan: [
    `${rootDir}/api/v1/mvc/**/*.ts`,
    `${rootDir}/api/v1/services/**/*.ts`,
    `${rootDir}/api/v1/middlewares/**/*.ts`,
    `${rootDir}/api/v1/converters/**/*.ts`
  ]
})
export class Server extends ServerLoader {

  constructor(settings) {
    super(settings);
  }

  /**
   * This method let you configure the middleware required by your application to works.
   * @returns {Server}
   */
  $beforeRoutesInit(): void | Promise<any> {
    this
      .use(cors())
      .use(GlobalAcceptMimesMiddleware)
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));

    return null;
  }

}
