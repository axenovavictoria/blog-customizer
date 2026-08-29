import { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select/Select';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import { Separator } from 'src/ui/separator/Separator';

import {
	ArticleStateType,
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	appliedSettings: ArticleStateType;
	onApply: (settings: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	appliedSettings,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	// Состояние формы
	const [formSettings, setFormSettings] =
		useState<ArticleStateType>(appliedSettings);
	// Открыт/закрыт сайдбар
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const sidebarRef = useRef<HTMLDivElement>(null);

	// Добавляем/удаляем слушатели только при открытии/закрытии
	useEffect(() => {
		if (!isSidebarOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node) &&
				// Проверяем, что клик не по кнопке стрелки
				!(event.target as HTMLElement).closest?.('[role="button"]')
			) {
				closeSidebar();
			}
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				closeSidebar();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isSidebarOpen]);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
		// При открытии синхронизируем форму с применёнными настройками
		if (!isSidebarOpen) {
			setFormSettings(appliedSettings);
		}
	};

	const closeSidebar = () => {
		setIsSidebarOpen(false);
	};

	const handleApply = () => {
		onApply(formSettings);
		setIsSidebarOpen(false);
	};

	const handleResetForm = () => {
		setFormSettings(defaultArticleState);
		onReset();
		setIsSidebarOpen(false);
	};

	const handleFontFamilyChange = (selected: OptionType) => {
		setFormSettings({ ...formSettings, fontFamilyOption: selected });
	};

	const handleFontSizeChange = (selected: OptionType) => {
		setFormSettings({ ...formSettings, fontSizeOption: selected });
	};

	const handleFontColorChange = (selected: OptionType) => {
		setFormSettings({ ...formSettings, fontColor: selected });
	};

	const handleBackgroundColorChange = (selected: OptionType) => {
		setFormSettings({ ...formSettings, backgroundColor: selected });
	};

	const handleContentWidthChange = (selected: OptionType) => {
		setFormSettings({ ...formSettings, contentWidth: selected });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleApply();
	};

	const handleResetFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleResetForm();
	};

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={toggleSidebar} />

			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleResetFormSubmit}>
					<div className={styles.fields}>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={formSettings.fontFamilyOption}
							onChange={handleFontFamilyChange}
						/>

						<Separator />

						<RadioGroup
							name='fontSize'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={formSettings.fontSizeOption}
							onChange={handleFontSizeChange}
						/>

						<Separator />

						<Select
							title='Цвет текста'
							options={fontColors}
							selected={formSettings.fontColor}
							onChange={handleFontColorChange}
						/>

						<Separator />

						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={formSettings.backgroundColor}
							onChange={handleBackgroundColorChange}
						/>

						<Separator />

						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={formSettings.contentWidth}
							onChange={handleContentWidthChange}
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
