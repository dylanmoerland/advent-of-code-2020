run:
	deno run --allow-read --allow-write --config=tsconfig.json index.ts 
test:
	deno test
format:
	deno fmt
debug:
	deno run -A --inspect-brk index.ts
bundle:
	rm -rf build/
	mkdir build
	deno bundle index.ts build/index