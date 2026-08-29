import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	// Применённые настройки
	const [appliedSettings, setAppliedSettings] =
		useState<ArticleStateType>(defaultArticleState);
	// Настройки в форме
	const [formSettings, setFormSettings] =
		useState<ArticleStateType>(defaultArticleState);
	// Открыт/закрыт сайдбар
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const handleApply = () => {
		setAppliedSettings(formSettings);
		setIsSidebarOpen(false);
	};

	const handleReset = () => {
		setFormSettings(defaultArticleState);
		setAppliedSettings(defaultArticleState);
	};

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const closeSidebar = () => {
		setIsSidebarOpen(false);
		setFormSettings(appliedSettings);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appliedSettings.fontFamilyOption.value,
					'--font-size': appliedSettings.fontSizeOption.value,
					'--font-color': appliedSettings.fontColor.value,
					'--container-width': appliedSettings.contentWidth.value,
					'--bg-color': appliedSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				settings={formSettings}
				onSettingsChange={setFormSettings}
				onApply={handleApply}
				onReset={handleReset}
				isSidebarOpen={isSidebarOpen}
				onToggleSidebar={toggleSidebar}
				onCloseSidebar={closeSidebar}
			/>
			<Article />
		</main>
	);
};
