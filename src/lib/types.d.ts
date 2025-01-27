interface God {
	id: number;
	name: string;
	min_talent: number;
	max_talent: number;
	icon: string;
	background: string;
	size: [number, number];
}

interface TalentNodeType {
	id: number;
	position: [number, number];
	before_id: number;
	icon: string;
	name: string;
	attr: string;
	level_up_time: number;
	need_points: number;
}

interface TalentPageType {
	god: God;
	talents: Array<TalentNode>;
}
