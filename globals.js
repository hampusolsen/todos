export const API_ROOT$ = 'http://3.120.96.16:3002/';
export const categories$ = [
	{
		category: 'Uncategorized',
		emoji: '📃',
		theme: 'grey'
	},
	{
		category: 'Home',
		emoji: '🏡',
		theme: 'dodgerblue'
	},
	{
		category: 'Study',
		emoji: '📖',
		theme: 'limegreen'
	},
	{
		category: 'Work',
		emoji: '🏢',
		theme: 'orange'
	},
	{
		category: 'Grocery',
		emoji: '🥩',
		theme: 'red'
	},
	{
		category: 'Upcoming Event',
		emoji: '📆',
		theme: 'purple'
	},
	{
		category: 'Vacation',
		emoji: '🛫',
		theme: 'pink'
	}
];

export function findTheme(list) {
	return categories$.find(({ category }) => category.toLowerCase() === list.category).theme;
}

export function findEmoji(list) {
	return categories$.find(({ category }) => category.toLowerCase() === list.category).emoji;
}
