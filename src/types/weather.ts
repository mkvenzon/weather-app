export interface Weather {
    name: string;
    weather: [
        {
            description: string;
        }
    ];
    main: {
        temp: number;
    };
}
