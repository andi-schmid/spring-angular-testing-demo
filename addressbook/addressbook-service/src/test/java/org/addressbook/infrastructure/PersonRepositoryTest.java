package org.addressbook.infrastructure;

import org.addressbook.domain.Person;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;

@RunWith(SpringRunner.class)

// Using @SpringBootTest and @DtaJpaTest together can cause confusing results. Do not use these Annotations together
// if you are only testing repositories.

// @DataJpaTest switches auto configuration off and configures only JPA relevant beans. Configures an in-memory DB.
@DataJpaTest
@TestPropertySource(properties = {"spring.datasource.data=person-repository-test-data.sql"})
@Sql(statements = {
        "insert into Person (id, version, firstname, lastname, street, zip, city, phone) " +
                "values (1,0,'Felix','Meier','Effingerstr. 10','3000','Bern','+41 31 111 11 11')",
        "insert into Person (id, version, firstname, lastname, street, zip, city, phone) " +
                "values (2,0,'Felix','Huber','Effingerstr. 15','3000', 'Bern','+41 31 222 22 22')"
})
public class PersonRepositoryTest {

    private static final int DEFAULT_ID = 1;
    private static final int DEFAULT_VERSION = 0;
    private static final String DEFAULT_FIRSTNAME = "Felix";
    private static final String DEFAULT_LASTNAME = "Meier";
    private static final String DEFAULT_STREET = "Effingerstr. 10";
    private static final String DEFAULT_ZIP = "3000";
    private static final String DEFAULT_CITIY = "Bern";
    private static final String DEFAULT_PHONE = "+41 31 111 11 11";

    @Autowired
    private PersonRepository personRepository;

    @Sql(statements = {
            "insert into Person (id, version, firstname, lastname, street, zip, city, phone) values ("
                    + DEFAULT_ID + "," + DEFAULT_VERSION + ",'" + DEFAULT_FIRSTNAME + "','" + DEFAULT_LASTNAME + "'," +
                    "'" + DEFAULT_STREET + "','" + DEFAULT_ZIP + "','" + DEFAULT_CITIY + "','" + DEFAULT_PHONE + "')",
            "insert into Person (id, version, firstname, lastname, street, zip, city, phone) " +
                    "values (2,0,'Stefan','" + DEFAULT_LASTNAME + "','Effingerstr. 15','3000', 'Bern','+41 31 222 22 22')"
    })
    @Test
    public void findByFirstname() {

        List<Person> resultPersons = personRepository.findByFirstname(DEFAULT_FIRSTNAME);
        checkResult(resultPersons);
    }


    @Test
    public void findByLastname() {

        List<Person> resultPersons = personRepository.findByLastname(DEFAULT_LASTNAME);
        checkResult(resultPersons);
    }

    @Test
    public void findByFirstnameAndLastname() {

        List<Person> resultPersons = personRepository.findByFirstnameAndLastname(DEFAULT_FIRSTNAME, DEFAULT_LASTNAME);
        checkResult(resultPersons);
    }

    private void checkResult(List<Person> resultPersons) {

        assertThat(resultPersons, hasSize(1));

        Person resultPerson = resultPersons.get(0);

        assertThat(resultPerson.getId(), is(DEFAULT_ID));
        assertThat(resultPerson.getVersion(), is(DEFAULT_VERSION));
        assertThat(resultPerson.getFirstname(), is(DEFAULT_FIRSTNAME));
        assertThat(resultPerson.getLastname(), is(DEFAULT_LASTNAME));
        assertThat(resultPerson.getStreet(), is(DEFAULT_STREET));
        assertThat(resultPerson.getZip(), is(DEFAULT_ZIP));
        assertThat(resultPerson.getCity(), is(DEFAULT_CITIY));
        assertThat(resultPerson.getPhone(), is(DEFAULT_PHONE));
    }
}