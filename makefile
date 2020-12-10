run:
	deno run --v8-flags=--max-old-space-size=8192 --allow-read --allow-write --config=tsconfig.json index.ts
	deno test
format:
	deno fmt
debug:
	deno run -A --inspect-brk index.ts
bundle:
	rm -rf build/
	mkdir build
	deno bundle index.ts build/index