class ScreenManager {

    static show(screenId){

        document
            .querySelectorAll(".screen")
            .forEach(screen => {
                screen.classList.remove("active");
            });

        document
            .getElementById(screenId)
            .classList.add("active");
    }

}