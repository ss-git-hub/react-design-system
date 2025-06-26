declare module '*.svg' {
	const content: string;
	export default content;
}
declare module '*.module.scss' {
	const styles: { [key: string]: string };
	export default styles;
}
