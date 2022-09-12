export class Time {
    static Second() {
        return 1;
    }

    static Minute() {
        return Time.Second() * 60;
    }

    static Hour() {
        return Time.Minute() * 60;
    }

    static Day() {
        return Time.Hour() * 24;
    }
}
