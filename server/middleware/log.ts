import morgan from "morgan";

const logger = morgan("tiny");

export default defineEventHandler((event) => {
  logger(event.node.req, event.node.res, () => {});
});
