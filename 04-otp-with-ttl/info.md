# Redis Expire Options

```javascript
The EXPIRE command supports a set of options:

NX -- Set expiry only when the key has no expiry
XX -- Set expiry only when the key has an existing expiry
GT -- Set expiry only when the new expiry is greater than current one
LT -- Set expiry only when the new expiry is less than current one
A non-volatile key is treated as an infinite TTL for the purpose of GT and LT. The GT, LT and NX options are mutually exclusive.
```
Link: `https://redis.io/docs/latest/commands/expire/`