run:
	deno run --allow-read --allow-write --config=tsconfig.json index.ts
format:
	deno fmt
debug:
	deno run -A --inspect-brk index.ts
bundle:
	rm -rf build/
	mkdir build
	deno bundle index.ts build/index