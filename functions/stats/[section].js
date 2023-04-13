import mixpanel from "mixpanel-browser";

const validSections = ["dentagra", "freyr", "chi-squared"];

export function onRequest(context) {
    const section = context.params.section;

    if (!validSections.includes(section))
        return new Response("NOT OK 👎", { status: 400 });

    console.log("Initiating mixpanel");
    mixpanel.init(context.env.MIXPANEL_TOKEN);
    console.log("Tracking opening of section:", section);
    mixpanel.track("Section opened", {
        "Section": section,
    });
    console.log("Tracking complete");
    return new Response("OK", { status: 200 });
}
