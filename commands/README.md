# Commands

These command line programs uses a `config.json` to save intermediate results.

## Specify the host to use

```
node sethost http://localhost:4444
node sethost https://public-testnet.rsk.co:443
node sethost http://localhost:8545
```

## Named account

```
node setaccount root 0
node setaccount alice 1
```

The number indicates the position of the account in the host wallet. `ganache-cli`
has 10 accounts and `rskj` local/regtest has 11 accounts available to use.

## New account

```
node genaccount alice
node genaccount bob
node genaccount charlie
```

New accounts are created, with private keys, public keys and addresses.

## Get account balance
```
node getbalance root
node getbalance alice
```
The value is expressed in `weis`.

## Get account balances
```
node getbalances
```
Retrieves all known accounts and deployed instances balances, expressed
in `weis`.

## Get account gas supplies
```
node getgassupplies
```
Retrieves all known accounts and deployed instances gas supply. Each
supply is the account balance divided by the gas price currently expected
by the network.

## Transfer

```
node transfer root alice 1000000000
```

Internally, it uses `21000` gas units. If you need to transfer to a contract,
an additional argument with the gas to use could be provided:

```
node transfer root alice 1000000000 100000
```

## Deploy contract
```
node deploy counter1 Counter
```

The last argument is the name of the compiled contract (in these samples,
the contract information is into `build/contracts`. `counter1` is the
logical name of the new instance.


## Call contract
```
node call root counter1 counter()
node call alice counter1 counter()
```

## Invoke contract
```
node invoke root counter1 increment()
node invoke alice counter1 add(uint256) 42
node invoke alice token1 transfer(address,uint256) charlie,1000
```

If the invocation has more than one argument,
 they are separated by commas.

## Managing File

Deploy a `ChunkedFile` smart contract:

```
node invoke root file1 ChunkedFile
```

Now, upload a local file (try only small files, with less than 20K bytes in size)
using a chunk size of 4096 bytes:

```
node upload root file1 <localfilename> 4096
```

If you want to download a file, execute:

```
node download root file1 <localfilename>
```
