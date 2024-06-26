# HTMLServ

A silly attempt to connect to InspIRCd's 1205 server-to-server protocol
from a web browser via WebSocket.  I know absolutely nothing about
JavaScript and web browsers, so this is *obviously* a good
first project in that environment.

Forked from [9pfs/hello-smile6's attempt for solanum](https://github.com/hello-smile6/html5-solanum-s2s-implementation/).

## Comparison with CoupServ

CoupServ ([git.andrewyu.org](https://git.andrewyu.org/hax/coupserv.git)/[sr.ht](https://git.sr.ht/~runxiyu/coupserv)/[GitHub](https://github.com/runxiyu/coupserv)) is a (probably more usable) InspIRCd-linking pseudo-server written by Test\_User.


| |CoupServ|HTMLServ|
|-|--------|--------|
|Language|C|JavaScript ES6|
|Connection method|GnuTLS|WebSocket|
|Environment|Native UNIX-like|Web browser|
|Chaos level|UNIXly chaotic|Webdev-style chaos|
|Commands|Many|Few|

## InspIRCd configuration

```xml
<link name="htmlserv.irc.andrewyu.org"
	ipaddr="irc.andrewyu.org" # dummy
	port="7890"               # dummy
	allowmask="*"
	timeout="5m"
	sslprofile="Servers"      # dummy
	bind=""                   # dummy
	statshidden="no"
	hidden="no"
	sendpass="changeme"
	recvpass="changeme">

<module name="websocket">

<bind address=""
	port="7890"
	type="servers"
	hook="websocket"
	sslprofile="Servers">

<wsorigin allow="http://localhost:5000"> # whatever the Origin header of the request will be
```

Of course, ensure that you have a `sslprofile` called `Servers`.
