export const appendScript = (script_to_append) => {
    const script = document.createElement('script');
    script.type = "text/javascript";
    script.src = script_to_append;
    script.async = true;
    document.body.appendChild(script);
}