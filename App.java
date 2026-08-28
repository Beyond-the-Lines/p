package org.commonthreadarts;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.file.Files;
import java.nio.file.Path;

/** A lightweight local server for the Common Thread Arts project shell. */
public final class App {
  private static final Path WEB_ROOT = Path.of(".").toAbsolutePath().normalize();

  public static void main(String[] args) throws IOException {
    HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
    server.createContext("/", App::serveStaticFile);
    server.start();
    System.out.println("Common Thread Arts is running at http://localhost:8080");
  }

  private static void serveStaticFile(HttpExchange exchange) throws IOException {
    String requestPath = exchange.getRequestURI().getPath();
    String fileName = requestPath.equals("/") ? "index.html" : requestPath.substring(1);
    Path file = WEB_ROOT.resolve(fileName).normalize();

    if (!file.startsWith(WEB_ROOT) || !Files.isRegularFile(file)) {
      exchange.sendResponseHeaders(404, -1);
      return;
    }

    byte[] content = Files.readAllBytes(file);
    exchange.getResponseHeaders().set("Content-Type", contentType(fileName));
    exchange.sendResponseHeaders(200, content.length);
    try (OutputStream body = exchange.getResponseBody()) {
      body.write(content);
    }
  }

  private static String contentType(String fileName) {
    if (fileName.endsWith(".css")) return "text/css; charset=utf-8";
    if (fileName.endsWith(".js")) return "text/javascript; charset=utf-8";
    return "text/html; charset=utf-8";
  }
}
