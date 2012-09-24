(function(){

if(!window.Prism) {
	return;
}

Prism.languages.bash = {
	'comment': {
		pattern: /^#.*(\r?\n|$)/gm,
		lookbehind: false
	},
	'string': /("|')(\\?.)*?\1/g,
	'regex': {
		pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
		lookbehind: true
	},
	'keyword': /\b(if|fi|then|elif|else|for|do|done|until|while|break|continue|case|function|return|in|eq|ne|gt|lt|ge|le|esac)\b/g,
	'command': /\b(mkfs|alias|apropos|awk|bash|bc|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chmod|chown|chroot|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|cut|curl|date|dc|dd|ddrescue|declare|df|diff|diff3|dig|dir|dircolors|dirname|dirs|du|echo|egrep|eject|enable|env|ethtool|eval|exec|exit|expand|export|expr|false|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|gawk|getopts|grep|groups|gzip|hash|head|history|hostname|id|ifconfig|import|install|join|kill|less|let|ln|local|locate|logname|logout|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|make|man|mkdir|mkfifo|mkisofs|mknod|more|mount|mtools|mv|netstat|nice|nl|nohup|nslookup|open|op|passwd|paste|pathchk|ping|popd|pr|printcap|printenv|printf|ps|pushd|pwd|quota|quotacheck|quotactl|ram|rcp|read|readonly|renice|remsync|rm|rmdir|rsync|screen|scp|sdiff|sed|select|seq|set|sftp|shift|shopt|shutdown|sleep|sort|source|split|ssh|strace|su|sudo|sum|symlink|sync|tail|tar|tee|test|time|times|touch|top|traceroute|trap|tr|true|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unset|unshar|useradd|usermod|users|uuencode|uudecode|v|vdir|vi|watch|wc|whereis|which|who|whoami|wget|xargs|yes|vim|bind)\b/g,
	'boolean': /\b(true|false)\b/g,
	'number': /\b-?(0x)?\d*\.?\d+\b/g,
	'operator': /[-+]{1,2}|!|`|=?&lt;|=?&gt;|={1,2}|(&amp;){1,2}|\|?\||\?|\*|\//g,
	'ignore': /&(lt|gt|amp);/gi,
	'punctuation': /[{}[\];(),.:]/g
};

})();