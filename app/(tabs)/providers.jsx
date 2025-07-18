import { useComponentContext } from '@/context/globalAppContext';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import JobTypeSelector from '../../components/JobTypeSelector';
import ProviderSummaryBlock from '../../components/ProviderSummaryBlock';
import SearchPanel from '../../components/SearchPanel';

export default function StoreScreen() {
  const { activeThemeStyles, users } = useComponentContext();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: activeThemeStyles?.backgroundColor },
      ]}
    >
      <View>
        <SearchPanel
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </View>
      <View>
        <JobTypeSelector
          selectedTypes={filteredJobs}
          setSelectedTypes={setFilteredJobs}
        />
      </View>
      <ScrollView>
        {users
          .filter(
            (user) =>
              (filteredJobs.length > 0 ?
                user?.jobTypes.some((jobType) =>
                  filteredJobs.includes(jobType)
                ) : user) &&
              (user?.name.toLowerCase().includes(searchValue.toLowerCase()) ||
              user?.surname.toLowerCase().includes(searchValue.toLowerCase()))
          )
          .map((user, index) => (
            <ProviderSummaryBlock key={index} user={user} />
          ))}
      </ScrollView>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
};
