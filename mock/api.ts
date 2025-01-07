import herolist from './herolist.json';

export default {
  'POST /api/mock/freeheros.json': (req, res) => {
    const { number } = req.body;
    function getRandomArrayElements(arr, number) {
      var shuffled = arr.slice(0),
        i = arr.length,
        min = i - number,
        temp,
        index;
      while (i-- > min) {
        // floor函数返回小于等于一个数的最大整数
        index = Math.floor((i + 1) * Math.random()); // 该方法可以随机均等机会的取到0到i内的一个整数
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(min);
    }
    const freeheros = getRandomArrayElements(herolist, number);
    res.send(freeheros);
  },
};
