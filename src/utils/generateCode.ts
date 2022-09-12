export default function generateCode() {
    return (Date.now() + Math.random() * 1000).toString(16);
}
