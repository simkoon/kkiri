import Router from "koa-router";
import * as albumCtrl from "./album.ctrl";
import checkLoggedIn from "../../lib/checkLoggedIn";

const albums = new Router();
albums.get('/', albumCtrl.list);
albums.post("/fileupload", albumCtrl.fileupload);

const album = new Router();
album.get('/:idx', albumCtrl.read);
album.delete('/', checkLoggedIn, albumCtrl.remove);
album.patch('/:idx', albumCtrl.update);

albums.use('/:id', albumCtrl.checkObjectId, album.routes());

export default albums;
