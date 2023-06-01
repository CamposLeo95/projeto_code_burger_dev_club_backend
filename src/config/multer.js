import multer from "multer";
import { v4 } from "uuid";
import { extname, resolve } from "path";

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, "..", "..", "uploads"),
    filename: (req, file, callback) =>
      // Essa função retorna um nome para o arquivo
      // v4 gera um nome aleatorio e extname(file.originalname) retorna a extensão
      callback(null, v4() + extname(file.originalname)),
  }),
};
