import { createMcpHandler } from "@vercel/mcp-adapter";
import { z } from "zod";

const handler = createMcpHandler(
  (server) => {
    server.tool(
      "echo",
      "Echo a message",
      { message: z.string() },
      async ({ message }) => ({
        content: [{ type: "text", text: `Tool echo: ${message}` }],
      })
    );

    server.tool(
      "getHazard",
      "Returns a random hazard number from 1 to 3",
      {},
      async () => {
        const randomNumber = Math.floor(Math.random() * 3) + 1;
        return {
          content: [{ type: "text", text: `Hazard level: ${randomNumber}` }],
        };
      }
    );
  },
  {
    capabilities: {
      tools: {
        echo: {
          description: "Echo a message",
        },
        getHazard: {
          description: "Returns a random hazard number from 1 to 3",
        },
      },
    },
  },
  {
    redisUrl: process.env.REDIS_URL,
    basePath: "",
    verboseLogs: true,
    maxDuration: 60,
  }
);

export { handler as GET, handler as POST, handler as DELETE };
