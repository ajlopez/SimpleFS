# Images Express DApp

## Description

This Express application shows images retrieved from 
[RSK Testnet](https://explorer.testnet.rsk.co/). The images
data is saved in smart contract storage.

## Install dependencies

Execute

```
npm install
```

## Configure

Edit the file `config.json`:

```json
{
    "host": "https://public-node.testnet.rsk.co:443"
}
```

If you have a local node synched with RSK testnet, change
the host property, ie:

```json
{
    "host": "http://localhost:4444"
}
```


## Launch Dapp

Execute

```
npm run start
```

Navigate with your browser to [http://localhost:3000](http://localhost:3000).

## References

- [Express application generator](https://expressjs.com/en/starter/generator.html)
- [Express samples](https://expressjs.com/en/starter/examples.html)
- [Cache headers in Express js app](https://regbrain.com/article/cache-headers-express-js)