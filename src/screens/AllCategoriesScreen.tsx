import CategoryGrid from '../components/CategoryGrid';

interface AllCategoriesScreenProps {
    onCat: (id: string) => void;
}

export default function AllCategoriesScreen({ onCat }: AllCategoriesScreenProps) {
    return (
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingBottom: 20 }}>
            {/* We can reuse the CategoryGrid component to display all categories since we don't pass a limit prop */}
            <CategoryGrid onCat={onCat} />
        </div>
    );
}
