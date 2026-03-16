import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

async function start() {
  const app = express();

  // Create Vite dev server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Use Vite's middleware for HMR and asset serving
  app.use(vite.middlewares);

  // Fallback: serve index.html for SPA routes
  app.use("*", async (req, res, next) => {
    try {
      const html = await vite.transformIndexHtml(
        req.originalUrl,
        (await import("fs")).readFileSync(
          path.resolve(__dirname, "index.html"),
          "utf-8"
        )
      );
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\n  Avertris dev server running at:`);
    console.log(`  ➜  Local:   http://localhost:${PORT}/`);
    console.log(`  ➜  Network: http://0.0.0.0:${PORT}/`);
    console.log(`  ➜  Health:  http://localhost:${PORT}/api/health\n`);
  });
}

start();
