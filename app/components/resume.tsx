const experienceItems: Array<{
  title: string;
  company: string;
  startDate: string;
  endDate: string;
}> = [
  {
    title: "Quantitative Research Engineer",
    company: "Citadel GQS",
    startDate: "Start Date",
    endDate: "End Date",
  },
  {
    title: "Quantitative Trading Engineer",
    company: "Citadel GQS",
    startDate: "Start Date",
    endDate: "End Date",
  },
];

export function ExperienceList() {
  return (
    <ul>
      {experienceItems.map((experience, index) => (
        <li className="flex" key={index}>
          <div className="flex-1">
            <h3>{experience.title}</h3>
            <p className="text-sm text-gray-500">{experience.company}</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-sm text-gray-500">
              {experience.startDate} - {experience.endDate}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
