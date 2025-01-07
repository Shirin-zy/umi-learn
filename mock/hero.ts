// 放在mock下的js/ts文件会自动被解析为mock文件，允许开发者在开发环境中模拟 API请求
import herolist from './herolist.json';
export default {
  '/api/web201605/js/herolist.json': herolist,
  'POST /api/herodetails.json': (req, res) => {
    console.log(req);
    const { ename } = req.body;
    const hero = herolist.filter(
      (item) => item.ename === parseInt(ename, 10),
    )[0];
    res.send(hero);
  },
};
