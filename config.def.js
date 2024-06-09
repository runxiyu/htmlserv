/*
 * SPDX-License-Identifier: GPL-3.0-only
 * Copyright (c) 2024 Runxi Yu <me@runxiyu.org>
 * Copyright (c) 2022 hello-smile6
 */

var defts = Math.floor(Date.now() / 1000);

const config = {
	sid: "1F7",
	send_password: "changeme",
	accept_password: "changeme",
	ws_url: "wss://andrewyu.org:7890",
	server_name: "htmlserv.irc.andrewyu.org",
	description: "oops!",
	main_nick: "HTMLServ",
	main_uid_without_sid: "000000",
	main_nick_ts: defts;
	main_real_host: "/dev/null",
	main_host: "/dev/null",
	main_ident: "html",
	main_addr: "/dev/null",
	main_user_ts: defts;
	main_umode: "+k",
	main_gecos: "https://git.sr.ht/~runxiyu/htmlserv/",
	main_join_channels: ["#chat", "#services"],
	main_channel_mode_on_join: "o",
	main_channel_mode_after_join: "o",
};
export default config;
