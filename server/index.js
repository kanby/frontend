import server from './server';
import * as util from './util';

server.listen(3000, () => {
  util.log('Listening on port 3000');
});
