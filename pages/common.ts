import Scrollbar from "smooth-scrollbar";

// 스크롤 업 버튼 - 플로팅 버튼 클릭 시 실행 함수
export default function scrollUp() {
    const scroll = getScrollbar();
    if (scroll?.scrollTop !== 0) scroll?.setMomentum(0, -scroll.scrollTop);
}

// 최상단에 스크롤 시 플로팅 버튼 사라짐
export function floatingHide(scrollTop: number) {
    if (typeof document !== "undefined") {
        const floating = document.querySelector("#floating") as HTMLElement;
        if (scrollTop === 0 || window.innerHeight * 0.9 <= 460) {
            floating.classList.remove("floating-show");
        } else {
            floating.classList.add("floating-show");
        }
    }
}

// --vh 변수 값을 만들어서 모바일 브라우저 접속 시 주소창에 의한 viewport 길이 변경을 감지하고 동적 변환
export function setScreenSize() {
    const scroll = getScrollbar();
    const vh = window.innerHeight;
    if (scroll!.size.content.height < vh + scroll!.scrollTop) {
        scroll?.setMomentum(0, scroll!.size.content.height - vh);
    }
    if (typeof document !== "undefined") {
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
}

// ScrollBar 초기화
export function scrollbarInit() {
    if (typeof document !== "undefined") {
        Scrollbar.init(document.querySelector("#root") as HTMLElement);
    }
}

// ScrollBar return
export function getScrollbar() {
    if (typeof document !== "undefined") {
        return Scrollbar.get(document.querySelector("#root") as HTMLElement);
    } else {
        return null;
    }
}

export function hideTitle() {
    if (typeof document !== "undefined") {
        // 각 페이지에 최초로 출력되는 타이틀 자동으로 숨겨지게 처리
        setTimeout(() => {
            const pageTitle = document.querySelector("#pageTitle") as HTMLElement;
            pageTitle.style.opacity = "0";
        }, 1000);
        setTimeout(() => {
            const pageTitle = document.querySelector("#pageTitle") as HTMLElement;
            pageTitle.style.display = "none";
        }, 2000);
    }
}
