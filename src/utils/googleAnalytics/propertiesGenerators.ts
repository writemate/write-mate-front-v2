//실행 시점에 프로퍼티를 생성하는 경우
export const pageViewEvent = (title: string, url: string) => ({
    page_title: title,
    page_location: url,
});

//이벤트 리스트에 정의할 때 fix된 프로퍼티를 생성하는 경우
export const signupEvent = (from: string) => () => ({
    from
});

export const useEvent = <T extends string>() => (use: T) => ({
    use: use
});

export const fromEvent = <T extends string>() => (from: T) => ({
    from
});

export const screenSizeEvent = () => {
    const browserWidth = window.innerWidth;

    if(browserWidth >= 1500) {
        return {
            screen_size: 'full_screen'
        }
    }
    if(browserWidth >= 1024) {
        return {
            screen_size: 'large_screen'
        }
    }
    if(browserWidth >= 768) {
        return {
            screen_size: 'half_screen'
        }
    }
    return {
        screen_size: 'small_screen'
    }
}

export const moveEvent = (direction: 'up' | 'down', move_range: number) => ({
    direction,
    move_range,
    move_count: 1,
});
