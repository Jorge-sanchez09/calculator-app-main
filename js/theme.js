const themeInput = document.querySelector('input[name="theme"]');

const changeTheme = () => {
    document.body.className = `theme-${themeInput.value}`;
    saveTheme();
}

const saveTheme = () => window.localStorage.setItem("theme", themeInput.value);

const getTheme = () => {
    if(window.localStorage.getItem("theme"))
        themeInput.value = window.localStorage.getItem("theme");
    else
        window.localStorage.setItem("theme", themeInput.value);

    changeTheme();
}
    
themeInput.addEventListener("change", () => {
    changeTheme(themeInput);
});


export { getTheme };